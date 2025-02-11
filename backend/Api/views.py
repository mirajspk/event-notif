from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import get_object_or_404 , render , redirect
from .models import Clubs, Subscriber, Event, EventRegistration
from .serializers import UserSerializer, ClubsSerializer, SubscriberSerializer, EventSerializer, EventRegistrationSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import viewsets
from rest_framework.decorators import api_view
from django.urls import reverse_lazy
from django.contrib.messages.views import SuccessMessageMixin
from django.views.generic import CreateView
from rest_framework.parsers import MultiPartParser, FormParser
from .forms import EventForm
from django.contrib import messages
from rest_framework import viewsets

import logging

logger = logging.getLogger(__name__)

User = get_user_model()


class RegisterClubAdminView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.user_type = 'ADMIN'  # Mark as club admin
            user.is_staff = True  # Allow access to Django admin (optional)
            user.save()
            return Response({"message": "Club admin registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClubsView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ClubsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        clubs = Club.objects.all()
        serializer = ClubsSerializer(clubs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SubscribeView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SubscriberSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            clubs = serializer.validated_data['clubs']

            subscriber, created = Subscriber.objects.get_or_create(email=email)
            subscriber.clubs.set(clubs)
            subscriber.save()

            return Response({'message': 'Subscribed successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventList(viewsets.ModelViewSet):

    parser_classes = (MultiPartParser, FormParser)
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    # get post from authentication/backend
    def post(self, request):
        if not request.user.is_admin_user():
            return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)

        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
 # Get the club object for the host (based on the 'host' value in the request)
            host_club = Clubs.objects.get(id=request.data['host'])  # Use 'id' or the relevant field to match
            event = serializer.save(created_by=request.user, host=host_club)

            # Send email to subscribers of the club hosting the event
            subscribers = Subscriber.objects.filter(clubs=host_club)
            subject = f'New Event: {event.name}'
            message = f'''
                Event: {event.name}
                Host: {event.host.club_name}
                Date: {event.date}
                Description: {event.description}
                Registration Link: {event.registration_link}
            '''
            recipient_list = [sub.email for sub in subscribers]

            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER,
                recipient_list,
                fail_silently=False
            )

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        #from backend/GET_POST (response)
        logger.error(f"Validation failed: {serializer.errors}")
        
        return Response({
            'error': 'Bad Request',
            'details': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  #from authentication/backend
        
    # def get from authentication/backend
    # def get(self, request):
    #     events = Event.objects.all().order_by('date')
    #     serializer = EventSerializer(events, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    #def get from backend/GET_POST
    def get(self, request, id=None):
        if id:
            event = get_object_or_404(Event, pk=id)
            serializer = EventSerializer(event, context={'request': request})
            return Response(serializer.data)
        
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True, context={'request': request})
        return Response(serializer.data)

    #def put and def delete from backend/GET_POST
    def put(self, request, id):
        event = get_object_or_404(Event, pk=id)
        serializer = EventSerializer(event, data=request.data, context={'request': request})
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        event = get_object_or_404(Event, pk=id)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class RelatedEventsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, host):
        events = Event.objects.filter(host__club_name=host).order_by('date')[:3]
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


class EventDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return None

    def put(self, request, pk):
        if not request.user.is_admin_user():
            return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)

        event = self.get_object(pk)
        if not event:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        if not request.user.is_admin_user():
            return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)

        event = self.get_object(pk)
        if not event:
            return Response({'error': 'Event not found'}, status=status.HTTP_404_NOT_FOUND)

        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EventRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, event_id):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        event = get_object_or_404(Event, pk=event_id)
        try:
            EventRegistration.objects.create(event=event, email=email)
            return Response({'message': 'Successfully registered'}, status=status.HTTP_201_CREATED)
        except IntegrityError:
            return Response({'error': 'You are already registered for this event'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        email = request.query_params.get('email')
        if not email:
            return Response({'error': 'Email parameter is required'}, status=status.HTTP_400_BAD_REQUEST)

        registrations = EventRegistration.objects.filter(email=email)
        serializer = EventRegistrationSerializer(registrations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        # Extract the tokens
        access_token = response.data.get("access")
        refresh_token = response.data.get("refresh")

        if access_token and refresh_token:
            # Set cookies
            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True, 
                secure=settings.DEBUG is False,  # Secure in production
                samesite="Lax",
                path="/",
            )
            response.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=settings.DEBUG is False,
                samesite="Lax",
                path="/api/token/refresh/",
            )

            # Remove tokens from response body for security
            del response.data["access"]
            del response.data["refresh"]

        return response

class TokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # Get refresh token from cookies
        request.data["refresh"] = request.COOKIES.get("refresh_token")

        if not request.data["refresh"]:
            return Response({"error": "No refresh token provided"}, status=400)

        response = super().post(request, *args, **kwargs)

        # Set new access token in cookie
        access_token = response.data.get("access")
        if access_token:
            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=settings.DEBUG is False,
                samesite="Lax",
                path="/",
            )
            del response.data["access"]  # Remove from response body for security

        return response

# login and refresh views for not storing token in cookies 
# class LoginView(TokenObtainPairView):
#     permission_classes = [AllowAny]
#
#
# class TokenRefreshView(TokenRefreshView):
#     permission_classes = [AllowAny]


class AddEventView(APIView):
    def get(self, request):
        form = EventForm()
        return render(request, "api/add_event.html", {"form": form})

    def post(self, request):
        form = EventForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Event added successfully!")
            return redirect("add_event")  # This most be same as name in url
        else:
            messages.error(request, "Please correct the errors below.")
        return render(request, "api/add_event.html", {"form": form})


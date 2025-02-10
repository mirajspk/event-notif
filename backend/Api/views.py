<<<<<<< HEAD
# from django.shortcuts import get_object_or_404
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .serializers import EventSerializer, ClubsSerializer
# from .models import Event, Clubs
# from rest_framework.parsers import MultiPartParser, FormParser
#
# class EventList(APIView):
#     # To parse the formfield and image upload by the frontend
#     parser_classes = (MultiPartParser, FormParser)
#
#     def get(self, request, id=None):
#         if id:
#             # Return single event if id is provided
#             event = get_object_or_404(Event, pk=id)
#             serializer = EventSerializer(event,context={'request': request})
#             return Response(serializer.data)
#         
#         # Return all events if no id is provided
#         events = Event.objects.all()
#         serializer = EventSerializer(events,context={'request': request}, many=True)
#         return Response(serializer.data)
#
#     def post(self, request):
#         serializer = EventSerializer(data=request.data,context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def put(self, request, id):
#         event = get_object_or_404(Event, pk=id)
#         serializer = EventSerializer(event,context={'request': request} ,data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#     def delete(self, request, id):
#         event = get_object_or_404(Event, pk=id)
#         event.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import EventSerializer, ClubsSerializer
from .models import Event, Clubs
from rest_framework.parsers import MultiPartParser, FormParser

class EventList(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, id=None):
        if id:
            # Fetch a single event
            event = get_object_or_404(Event, pk=id)
            serializer = EventSerializer(event, context={'request': request})  # ✅ Fix: Pass request context
            return Response(serializer.data)
        
        # Fetch all events
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True, context={'request': request})  # ✅ Fix: Pass request context
        return Response(serializer.data)

    def post(self, request):
        serializer = EventSerializer(data=request.data, context={'request': request})  # ✅ Fix: Pass request context
=======
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import get_object_or_404
from .models import Clubs, Subscriber, Event, EventRegistration
from .serializers import UserSerializer, ClubsSerializer, SubscriberSerializer, EventSerializer, EventRegistrationSerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import viewsets
from rest_framework.decorators import api_view

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
>>>>>>> merge/auth/backend
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

<<<<<<< HEAD
    def put(self, request, id):
        event = get_object_or_404(Event, pk=id)
        serializer = EventSerializer(event, data=request.data, context={'request': request})  # ✅ Fix: Pass request context
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        event = get_object_or_404(Event, pk=id)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

=======
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

    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_admin_user():
            return Response({'error': 'Admin access required'}, status=status.HTTP_403_FORBIDDEN)

        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            event = serializer.save(created_by=request.user)

            subscribers = Subscriber.objects.filter(clubs=event.host)
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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        events = Event.objects.all().order_by('date')
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


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


class TokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]
>>>>>>> merge/auth/backend

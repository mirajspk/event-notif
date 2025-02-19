from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.conf import settings
from django.shortcuts import get_object_or_404 , render , redirect
from .models import Clubs, Subscriber, Event 
from .serializers import UserSerializer, ClubsSerializer, SubscriberSerializer, EventSerializer 
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .forms import EventForm
from django.contrib import messages
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.conf import settings

import logging

logger = logging.getLogger(__name__)

User = get_user_model()


class ClubsView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ClubsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        clubs = Clubs.objects.all()  
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
            subscriber.clubs.add(*clubs)
            subscriber.save()

            return Response({'message': 'Subscribed successfully!'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventList(APIView):  
    permission_classes = [AllowAny]  

    def get(self, request, id=None):
        if id:
            event = get_object_or_404(Event, pk=id)
            serializer = EventSerializer(event, context={'request': request})
            return Response(serializer.data)

        events = Event.objects.all()
        serializer = EventSerializer(events, many=True, context={'request': request})
        return Response(serializer.data)


class EventDetail(APIView):
    permission_classes = [AllowAny]  

    def get_object(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return None

    def get(self, request, id=None):
        if id:
            event = get_object_or_404(Event, pk=id)
            serializer = EventSerializer(event, context={'request': request})
            return Response(serializer.data)

        events = Event.objects.all()
        serializer = EventSerializer(events, many=True, context={'request': request})
        return Response(serializer.data)


class AuthCheckView(APIView): #check authentication
    permission_classes=[AllowAny]
    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                'authenticated': True,
                'user': {
                    'email': request.user.email,
                    'is_staff': request.user.is_staff
                }
            })
        
        access_token = request.COOKIES.get('access_token')
        if access_token:
            try:
                token = AccessToken(access_token)
                user = User.objects.get(id=token['user_id'])
                return Response({
                    'authenticated': True,
                    'user': {
                        'email': user.email,
                        'is_staff': user.is_staff
                    }
                })
            except (InvalidToken, TokenError, User.DoesNotExist):
                pass
        
        return Response({'authenticated': False}, status=401)


class AddEventView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return redirect(f"{settings.FRONTEND_LOGIN_URL}?next={request.path}")

        if not request.user.is_staff:
            return redirect(f"{settings.FRONTEND_LOGIN_URL}?next={request.path}")

        form = EventForm()
        return render(request, "api/add_event.html", {"form": form})

    def post(self, request):
        if not request.user.is_authenticated:
            return redirect(f"{settings.FRONTEND_LOGIN_URL}?next={request.path}")

        if not request.user.is_staff:
            return redirect(f"{settings.FRONTEND_LOGIN_URL}?next={request.path}")

        form = EventForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, "Event added successfully!")
            return redirect("add_event")
        else:
            messages.error(request, "Please correct the errors below.")
        return render(request, "api/add_event.html", {"form": form})


class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        access_token = response.data.get("access")
        refresh_token = response.data.get("refresh")

        if access_token and refresh_token:
            # Ensure access token is overwritten, not duplicated
            response.delete_cookie("access_token")  # Clear any old access token
            response.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=False,
                samesite="Lax",
                path="/",
            )

            # Ensure refresh token is overwritten, not duplicated
            response.delete_cookie("refresh_token")  # Clear any old refresh token
            response.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=False,
                samesite="None",
                path="/api/token/refresh/",
            )

            # Get user details
            user = User.objects.get(username=request.data.get("username"))
            response.data.update({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "user_type": user.user_type,
                "club": user.club.id if user.club else None,
                "club_name": user.club.club_name if user.club else None,
                "is_club_admin": user.is_admin_user(),
            })

            # Hide tokens from the response body for security
            # del response.data["access"]
            # del response.data["refresh"]

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
                samesite="None",
                path="/",
            )
            del response.data["access"]  

        return response


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            logger.info("Logout request received")
            response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
            response.delete_cookie('access_token')
            response.delete_cookie('refresh_token')
            return response
        except Exception as e:
            logger.error(f"Error during logout: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def event_list(request):
    print(f"Current user: {request.user.username}")
    print(f"User type: {request.user.user_type if request.user.is_authenticated else 'Anonymous'}")
    print(f"User's club: {request.user.club if request.user.is_authenticated else 'None'}")

    # Checking if the user is authenticated
    if not request.user.is_authenticated:
        print("User is not authenticated.")
        return render(request, 'api/event_list.html', {'events': []}) 

    # Check if the user is an admin and has a club assigned
    if request.user.user_type != 'ADMIN' or request.user.club is None:
        print(f"User {request.user.username} is not an admin or has no club assigned.")
        return render(request, 'api/event_list.html', {'events': []})  

    # Fetch events for the user's club
    events = Event.objects.filter(host=request.user.club)

    print(f"Events found: {events.count()}")
    for event in events:
        print(f"Event: {event.name}, Host: {event.host}")

    return render(request, 'api/event_list.html', {'events': events})

def edit_event(request, event_id):
    event = get_object_or_404(Event, id=event_id)
    if request.method == "POST":
        form = EventForm(request.POST, request.FILES, instance=event)
        if form.is_valid():
            form.save()
            return redirect('event_list')
    else:
        form = EventForm(instance=event)
    return render(request, 'edit_event.html', {'form': form , "event" :event})

def delect_event(request, event_id):
    event = get_object_or_404(Event, id=event_id)
    if request.method == "POST":
        event.delete()
        return redirect('event_list')
    return render(request, 'delect_event.html', {'event': event})


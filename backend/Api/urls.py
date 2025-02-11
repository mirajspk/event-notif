# Updated urls.py
from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from Api import views
from .views import (
    RegisterClubAdminView, SubscribeView, LoginView, EventList,
    EventDetail, RelatedEventsView, EventRegistrationView, AddEventView
)
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'events', EventList, basename='event')  # Handles standard CRUD operations

urlpatterns = [
    # DRF Router URLs
    path('api/', include(router.urls)),

    # Additional Event Endpoints
    path('api/events/host/<str:host>/', RelatedEventsView.as_view(), name="related-events"),
    
    # Event Registration Endpoints
    path('api/events/<int:event_id>/register/', EventRegistrationView.as_view(), name='event-registration'),
    path('api/my-registrations/', EventRegistrationView.as_view(), name='my-registrations'),

    # Subscription and User Registration
    path('api/subscribe/', SubscribeView.as_view(), name='subscribe'),
    path('api/register/', RegisterClubAdminView.as_view(), name='register-club'),

    # Authentication Endpoints
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Admin Add Event (HTML Form)
    path('add_event/', AddEventView.as_view(), name='add_event'),
]

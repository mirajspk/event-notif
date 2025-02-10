from django.urls import path, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from Api import views
from .views import (
    RegisterClubAdminView, SubscribeView, LoginView, EventList,
    EventDetail, RelatedEventsView, EventRegistrationView
)
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

router = DefaultRouter()
router.register(r'events', EventList, basename='event')

urlpatterns = [
    # DRF Router for EventList (ViewSet)
    path('api/', include(router.urls)),

    # Individual Event Endpoints
    path('api/events/<int:pk>/', EventDetail.as_view(), name='event-detail'),
    path('api/events/host/<str:host>/', RelatedEventsView.as_view(), name="related-events"),

    # Event Registration Endpoints
    path('api/events/<int:event_id>/register/', EventRegistrationView.as_view(), name='event-registration'),
    path('api/my-registrations/', EventRegistrationView.as_view(), name='my-registrations'),

    # Subscription and User Registration
    path('api/subscribe/', SubscribeView.as_view(), name='subscribe'),
    path('api/register/', RegisterClubAdminView.as_view(), name='register-club'),

    # Authentication Endpoints
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

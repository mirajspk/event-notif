from django.urls import path
from .views import (
    RegisterClubAdminView, SubscribeView, LoginView, EventList,
    EventDetail, RelatedEventsView, EventRegistrationView, AddEventView, AuthCheckView, LogoutView, 
)
from .views import event_list ,  edit_event , delect_event
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [

    path('api/auth/login/', LoginView.as_view(), name='api-login'),
    path('api/auth/check', AuthCheckView.as_view(), name='auth-check'),
    path('api/auth/logout/', LogoutView.as_view(), name='logout'),

    # Event List Endpoint (GET and POST)
    path('api/events/', EventList.as_view(), name='event-list'),

    # Event Detail Endpoint (GET, PUT, DELETE)
    path('api/events/<int:pk>/', EventDetail.as_view(), name='event-detail'),

    # Related Events Endpoint
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
    # Url to list all the events
    path('events/', event_list,name='event_list'),
    path('events/edit/<int:event_id>/', edit_event, name='edit_event'),
    path('events/delect/<int:event_id>/', delect_event, name='delect_event'),


]

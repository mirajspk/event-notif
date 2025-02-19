from django.urls import path
from .views import (
    SubscribeView, LoginView, EventList,
    EventDetail, AddEventView, AuthCheckView, LogoutView, delete_event, 
)
from .views import event_list ,  edit_event , delete_event
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [

    path('api/auth/login/', LoginView.as_view(), name='api-login'),
    path('api/auth/check', AuthCheckView.as_view(), name='auth-check'),
    path('api/auth/logout/', LogoutView.as_view(), name='logout'),

    # Event List Endpoint (GET and POST)
    path('api/events/', EventList.as_view(), name='event-list'),

    # Event Detail Endpoint (GET, PUT, DELETE)
    path('api/events/<int:id>/', EventDetail.as_view(), name='event-detail'),

    # Subscription and User Registration
    path('api/subscribe/', SubscribeView.as_view(), name='subscribe'),

    # Authentication Endpoints
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Admin Add Event (HTML Form)
    path('add_event/', AddEventView.as_view(), name='add_event'),
    # Url to list all the events
    path('events/', event_list,name='event_list'),
    path('events/edit/<int:event_id>/', edit_event, name='edit_event'),
    path('events/delete/<int:event_id>/', delete_event, name='delete_event'),
]

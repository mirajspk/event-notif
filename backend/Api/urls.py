from django.urls import path
from Api import views
from .views import RegisterClubAdminView, SubscribeView

urlpatterns = [

    #Events
    path('events/',views.EventList.as_view(), name='event-list'),
    path('events/<int:pk>/', views.EventDetail.as_view(), name='event-detail'),
    path('events/host/<str:host>/', views.RelatedEventsView.as_view(), name = "related_events"),
    
    # Event Registration
    path('events/<int:event_id>/register/', 
         views.EventRegistrationView.as_view(), name='event-registration'), 
    path('my-registrations/', 
         views.EventRegistrationView.as_view(), name='my-registrations'),

    #subscription
    path('subscribe/', views.SubscribeView.as_view(), name='subscribe'),
    path('register/', RegisterClubAdminView.as_view(), name='register-club'),
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
]

    # path('clubs/', views.ClubsView.as_view(), name='club-list'),  
    # path('clubs/<int:id>/', views.ClubsView.as_view(), name='club-detail'),  

from django.urls import path
from Api import views

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
]

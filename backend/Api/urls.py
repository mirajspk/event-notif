from django.urls import path
from Api import views

urlpatterns = [
    # Event endpoints
    path('events/', views.EventList.as_view(), name='event-list'),
    path('events/<int:id>/', views.EventList.as_view(), name='event-detail'),

    # # Clubs endpoints
    # path('clubs/', views.ClubsView.as_view(), name='club-list'),  
    # path('clubs/<int:id>/', views.ClubsView.as_view(), name='club-detail'),  
]


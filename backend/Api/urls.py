from django.urls import path
from Api import views
urlpatterns = [
    # path('events/',views.EventList.as_view()),
    # path('clubs/', views.ClubsView.as_view()),  
    # path('clubs/<int:id>/', views.ClubsView.as_view()),  
    path('events/<int:id>/', views.EventList.as_view()), 
    path('event-list/', views.EventListView.as_view(), name='events-list')
]

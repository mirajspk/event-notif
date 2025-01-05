from django.urls import path
from Api import views
urlpatterns = [
    path('events/',views.EventList.as_view()),
    path('events/<int:id>/', views.EventList.as_view()), 
    path('event-list/', views.EventListView.as_view(), name='events-list')
]

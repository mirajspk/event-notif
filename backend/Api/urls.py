from django.urls import path
from Api import views
urlpatterns = [
    path('events/',views.EventList.as_view()),
    path('events/<int:pk>/', views.EventList.as_view()),  
    path('clubs/', views.ClubsView.as_view()),  
    path('clubs/<int:pk>/', views.ClubsView.as_view()),  
]

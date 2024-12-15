from django.urls import path
from Api import views
urlpatterns = [
    path('events/',views.EventList.as_view())
]

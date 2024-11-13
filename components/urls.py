# Here we will define the URL pattern for Our App
from django.urls import path
from .import views
app_name = 'components'
urlpatterns = [
    # Home Page
    path('', views.home , name = 'home'),
    path('events/', views.events, name= 'events'),
    path('workshops/', views.workshops, name= 'workshops'),
    path('clubs/',views.clubs, name= 'clubs'),
    path('news/',views.news, name = 'news')
]
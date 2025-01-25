from django.urls import path, include
from Api import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [

    # Authentication
    path('register/', views.UserRegistrationView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('google/login/', views.GoogleSignInView.as_view(), name='google_login'),
    
    #Events
    path('events/',views.EventList.as_view()),
    path('events/<int:pk>/', views.EventDetail.as_view(), name='event-detail'),
    path('events/host/<str:host>/', views.RelatedEventsView.as_view(), name = "related_events"),
    
    # Event Registration
    path('events/<int:event_id>/register/', 
         views.EventRegistrationView.as_view(), name='event-registration'), 
    path('my-registrations/', 
         views.EventRegistrationView.as_view(), name='my-registrations'),
    path('accounts/', include('allauth.urls')),

    #sign in
    path('', views.sign_in, name='sign_in'),
    path('sign-out', views.sign_out, name='sign_out'),
    path('auth-receiver', views.auth_receiver, name='auth_receiver'),
]

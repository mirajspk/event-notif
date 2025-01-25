from django.db import models
from django.db.models.query import django
from django.contrib.auth.models import AbstractUser, Group, Permission 
from django.utils import timezone
from time import timezone
from django.utils import choices 
from enum import unique
from google.auth import default


class User(AbstractUser):
    USER_TYPE_CHOICES = [
        ('ADMIN','Admin'),
        ('PARTICIPANT','Participant')
    ]
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField()
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='Participant')
    google_id = models.CharField(max_length=100, null=True, blank=True)


    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_groups",
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",
        blank=True,
    )

    def is_admin_user(self):
        return self.user_type == 'Admin'


class Event(models.Model):
    # Choices for 'Host'
    CLUB_CHOICES = [
        ('Coding Club', 'Coding Club'),
        ('Music Club', 'Music Club'),
        ('Drama Club', 'Drama Club'),
        ('Sports Club', 'Sports Club'),
        ('Photography Club', 'Photography Club'),
        ('Literature Club', 'Literature Club'),
        ('Art Club', 'Art Club'),
        ('Environment Club', 'Environment Club'),
        ('Robotics Club', 'Robotics Club'),
        ('Science Club', 'Science Club'),
    ]

    # Choices for 'Type'
    TYPE_CHOICES = [
        ('Event', 'Event'),
        ('Workshop', 'Workshop'),
    ]

    # Fields for the Event Model
    name = models.CharField(max_length=255)  
    location = models.CharField(max_length=255)  
    date = models.DateField()
    host = models.CharField(max_length=50, choices=CLUB_CHOICES)  
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)  
    registration_link = models.URLField(max_length=500)  

    description = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_events', null=True, blank=True)

    
class EventRegistration(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    participant = models.ForeignKey(User, on_delete=models.CASCADE)
    registration_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['event', 'participant']


class Clubs(models.Model):
    club_name = models.CharField(max_length=30) # Name of the club
    club_description = models.CharField(max_length=1000)

from django.db import models
from django.db.models.query import django
from django.contrib.auth.models import AbstractUser, Group, Permission 

from django.db import models


class User(AbstractUser):
    USER_TYPE_CHOICES = [
        ('ADMIN','Admin'),
        ('PARTICIPANT','Participant')
    ]

    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField()
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='Participant')

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
    name = models.CharField(max_length=255)  # Event/workshop name
    location = models.CharField(max_length=255)  # Location of the event/workshop
    date = models.DateField()  # Date of the event/workshop
    host = models.CharField(max_length=50, choices=CLUB_CHOICES)  # Host club
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)  # Type: Event or Workshop
    registration_link = models.URLField(max_length=500)  # Link for registration

    def __str__(self):
        return f"{self.name} ({self.type}) by {self.host}"


class Clubs(models.Model):
    club_name = models.CharField(max_length=30) # Name of the club
    club_description = models.CharField(max_length=1000)

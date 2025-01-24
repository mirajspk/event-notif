from django.db import models

from django.db import models

class Event(models.Model):
    # Choices for 'Host'
    CLUB_CHOICES = [
        ('Association of Mechanical Engineering', 'AMES'),
        ('Compuatiional Mathematics Club', 'KUCMC'),
        ('Forum for Environmental Conservation and Management', 'FECAM'),
        ('Forum of Pharmacy', 'FoP'),
        ('Kathmandu University Architecture Students Club', 'KUARC'),
        ('Geomatics Engineering Society', 'GES'),
        ('Kathmandu University Circle of Noble Chemineers', 'KUCONC'),
        ('Kathmandu University Civil Engineering Club', 'KUCEC'),
        ('Kathmandu University Computer Club', 'KUCC'),
        ('Natural and Social Concern Society', 'NSCS'),
    ]

    # Choices for 'Type'
    TYPE_CHOICES = [
        ('Event', 'Event'),
        ('Workshop', 'Workshop'),
    ]
    # Fields for the Event Model
    name = models.CharField(max_length=2555)  # Event/workshop name
    location = models.CharField(max_length=2555)  # Location of the event/workshop
    date = models.DateField()  # Date of the event/workshop
    host = models.CharField(max_length=500, choices=CLUB_CHOICES)  # Host club
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)  # Type: Event or Workshop
    registration_link = models.URLField(max_length=500)  # Link for registration
    time = models.TimeField(null=True, blank=True)  # New Time field
    description = models.TextField(null= True, blank=True)  # New Description field
    image_url = models.URLField(blank=True, null=True)  # Store image URL

    def __str__(self):
        return f"{self.name} ({self.type}) by {self.host}"


class Clubs(models.Model):
    club_name = models.CharField(max_length=30) # Name of the club
    club_description = models.CharField(max_length=1000)
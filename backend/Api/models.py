from django.db import models

from django.db import models

class Event(models.Model):
    # Choices for 'Host'
    CLUB_CHOICES = [

        ('KUCC','Kathmandu University Computer Club' ),
        ('AMES','Association of Mechanical Engineering'),
        ('KUCMC','Compuatiional Mathematics Club'),
        ('FECAM','Forum for Environmental Conservation and Management'),
        ('FoP','Forum of Pharmacy'),
        ('KUARC','Kathmandu University Architecture Students Club'),
        ('GES','Geomatics Engineering Society'),
        ('KUCONC','Kathmandu University Circle of Noble Chemineers'),
        ('KUCEC','Kathmandu University Civil Engineering Club'),
        ('KUCC','Kathmandu University Computer Club'),
        ('NSCS','Natural and Social Concern Society',),
        ('KURC','Kathmandu University Robotics Club',),
        ('KUBIC','Biotechnology Creatives',),
        ('SEEE','Society of Electrical and Electronic Engineers',),
        ('SBIS','Society of business Information Student',),
        ('KUAIC','Artificial Intellengence Club'),
        ('KUGIC','Kathmandu University Indoors Games Club'),
        ('KUSMC','Kathmandu University Society of Music and Clulture'),
    ]

    EVENT_TYPE = [
        ("Workshop","Workshop"),
        ("Event", "Event"),
    ]

    # Fields for the Event Model
    title = models.CharField(max_length=2555, null= True)  # Event/workshop name
    location = models.CharField(max_length=2555, null = True)  # Location of the event/workshop
    date = models.DateField()  # Date of the event/workshop
    host = models.CharField(max_length=500, choices=CLUB_CHOICES)  # Host club
    type = models.CharField(max_length=50 ,choices=EVENT_TYPE)  # Type: Event or Workshop
    registration_link = models.URLField(max_length=500)  # Link for registration
    startTime= models.CharField(max_length=50, blank=True)  # New Time field
    description = models.TextField(null= True, blank=True)  # New Description field
    image = models.ImageField(upload_to="events/",blank=True, null=True)  # Store image 
    imageTwo = models.ImageField(upload_to="events/",blank=True, null=True)  # Store image

    def __str__(self):
        return f"{self.name} ({self.type}) by {self.host}"


class Clubs(models.Model):
    club_name = models.CharField(max_length=30) # Name of the club
    club_description = models.CharField(max_length=1000)

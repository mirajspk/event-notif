from django.contrib.auth.models import AbstractUser 
from django.db import models


class User(AbstractUser):
    USER_TYPE_CHOICES = [
        ('ADMIN', 'Admin'),
        ('PARTICIPANT', 'Participant')
    ]
    
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=False)  
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='PARTICIPANT')
    club = models.ForeignKey("Clubs", on_delete=models.SET_NULL, null=True, blank=True, related_name='admins')

    def is_admin_user(self):
        return self.user_type == 'ADMIN'

    def __str__(self):
        return f"{self.username} ({self.user_type})"

    def save(self, *args, **kwargs):
        if self.user_type == 'ADMIN':
            self.is_staff = True 
        super().save(*args, **kwargs)


class Clubs(models.Model):
    club_name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)
    club_image = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return str(self.club_name)


class Event(models.Model):
    CLUB_CHOICES = [

        ('KUCC','Kathmandu University Computer Club' ),
        ('KUARC','Kathmandu University Architecture Students Club'),
        ('KURC','Kathmandu University Robotics Club',),
        ('KUCEC','Kathmandu University Civil Engineering Club'),
        ('SEEE','Society of Electrical and Electronic Engineers',),
        ('KUSMC','Kathmandu University Society of Music and Clulture'),
        ('AMES','Association of Mechanical Engineering'),
        ('KUCMC','Compuatiional Mathematics Club'),
        ('FECAM','Forum for Environmental Conservation and Management'),
        ('FoP','Forum of Pharmacy'),
        ('GES','Geomatics Engineering Society'),
        ('KUCONC','Kathmandu University Circle of Noble Chemineers'),
        ('NSCS','Natural and Social Concern Society',),
        ('KUBIC','Biotechnology Creatives',),
        ('SBIS','Society of business Information Student',),
        ('KUAIC','Artificial Intellengence Club'),
        ('KUGIC','Kathmandu University Indoors Games Club'),
    ]

    TYPE_CHOICES = [
        ('event', 'event'),
        ('workshop', 'workshop'),
    ]

    name = models.CharField(max_length=2555, null= True) 
    location = models.CharField(max_length=2555, null = True)  
    date = models.DateField()  
    host = models.ForeignKey(Clubs, on_delete=models.CASCADE)
    type = models.CharField(max_length=50, choices=TYPE_CHOICES)  
    registration_link = models.URLField(max_length=500, blank= True)  
    startTime= models.CharField(max_length=50)  
    description = models.TextField(null= True, blank=True)  
    image = models.ImageField(upload_to="events/", null=True)  
    created_by = models.CharField(max_length=500, choices=CLUB_CHOICES, null=True, blank=True) 



    def get_host_details(self, obj):
        return {
            'name': obj.host
        }
    def __str__(self):
        return f"{self.name} ({self.type}) by {self.host}"


class Subscriber(models.Model):
    email = models.EmailField(unique=False)
    clubs = models.ManyToManyField(Clubs, related_name="subscribers")  
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        club_names = ", ".join([club.club_name for club in self.clubs.all()])
        return f"{self.email} subscribed to {club_names}" if club_names else f"{self.email} (No clubs subscribed)"

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Event, Subscriber
from django.core.mail import send_mail
from django.conf import settings

@receiver(post_save, sender=Event)
def send_event_notification(sender, instance, created, **kwargs):
    if created:
        print(f"Event Created: {instance.name}")
        
        # Get subscribers for the club hosting the event
        subscribers = Subscriber.objects.filter(clubs=instance.host)
        
        # Prepare email content
        subject = f"New Event: {instance.name}"
        message = f'''
            {instance.type}: {instance.name}
            Host: {instance.host.club_name}
            Date: {instance.date}
            Description: {instance.description}
            Registration Link: {instance.registration_link}
            Image: {instance.image}
        '''
        
        # Collect recipient email addresses
        recipient_list = [sub.email for sub in subscribers]
        
        # Send email to all subscribers
        if recipient_list:  # Ensure there are subscribers to email
            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER,  # Your email as the sender
                recipient_list,  # List of subscribers' emails
                fail_silently=False
            )
            print(f"Notification sent to {len(recipient_list)} subscribers")
        else:
            print("No subscribers found for the event.")

# Generated by Django 5.2.4 on 2025-07-03 04:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='profile_image',
            field=models.ImageField(blank=True, default='profile_pics/default.jpg', upload_to='profile_pics/'),
        ),
    ]

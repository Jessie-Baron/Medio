from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', image_url='https://miro.medium.com/max/785/0*Ggt-XwliwAO6QURi.jpg')
    marnie = User(
        username='Christine Hunt', email='marnie@aa.io', password='password', image_url='https://buffer.com/library/content/images/2022/03/amina.png')
    bobbie = User(
        username='Renee Crawford', email='bobbie@aa.io', password='password', image_url='https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg')
    test1 = User(
        username='Nathaniel Aguilar', email='test1@aa.io', password='password2', image_url='https://learn.zoner.com/wp-content/uploads/2019/01/how-can-you-get-good-profile-photos-watch-for-these-6-things.jpg')
    test2 = User(
        username='Justin Meyer', email='test2@aa.io', password='password3', image_url='https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg')
    test3 = User(
        username='Martin Caldwell', email='test3@aa.io', password='password4', image_url='https://w0.peakpx.com/wallpaper/539/984/HD-wallpaper-boys-dp-boys-attitude-boys-profile.jpg')
    test4 = User(
        username='Shelton Rodriguez', email='test4@aa.io', password='password5', image_url='https://images.unsplash.com/photo-1519764622345-23439dd774f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym95c3xlbnwwfHwwfHw%3D&w=1000&q=80')
    test5 = User(
        username='Joanna Prince', email='test5@aa.io', password='password6', image_url='https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg')
    test6 = User(
        username='Marcelo Travis', email='test6@aa.io', password='password7', image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMnODyySJaM11ohwez7d5gRaFrOK_gr_6Ujw&usqp=CAU')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(test1)
    db.session.add(test2)
    db.session.add(test3)
    db.session.add(test4)
    db.session.add(test5)
    db.session.add(test6)
    db.session.commit()
# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()

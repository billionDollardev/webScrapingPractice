import praw
from googletrans import Translator
import pandas as pd

 
reddit = praw.Reddit(

    client_id="N01g2Q4znkrjDARvM9h8vQ",
    client_secret="qxOSlWpnuJj3Q-93bhIvDYMhBwimkg",
    user_agent="PyScraping by u/m_josedov",

)

subreddit = reddit.subreddit("webscraping")
top_posts = subreddit.top(limit=10)


# Inicializamos el traductor
translator = Translator()
 

data = []
 

for post in top_posts:

    post_data = {

        "Title": post.title,
        "ID": post.id,
        "Author": str(post.author) if post.author else "Unknown",
        "URL": post.url,
        "SCORE": post.score,
        "Comment count": post.num_comments,
        "Created": post.created_utc
        
        
    }


    # Traducción

    translated_title = translator.translate(post.title, src='en', dest='es')
    post_data["Traducción Titulo"] = translated_title.text
    data.append(post_data)
 

post = reddit.submission(id="m9cxvf")

comments = post.comments[:3]

for comment in comments:

    comment_data = {
        "Comentario": comment.body,
        "Autor": str(comment.author) if comment.author else "Unknown"
    }

    # Traducción comentarios
    translated_comment = translator.translate(comment.body, src='en', dest='es')
    comment_data["Traducción Comentario"] = translated_comment.text   
    data.append(comment_data)


# Se crea el DataFrame

df = pd.DataFrame(data)

# Guardamos el DataFrame en CSV

df.to_csv('reddit_data.csv', index=False)  # Change the file name to your preference
print("DataFrame guardado en el archivo: 'reddit_data.csv'")

#print(df.to_html())
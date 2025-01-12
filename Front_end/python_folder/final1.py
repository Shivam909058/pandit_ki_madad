from flask import Flask, request, jsonify
import joblib
import googleapiclient.discovery
import googleapiclient.errors
import pickle
from flask_cors import CORS
import dotenv

dotenv.load_dotenv()

app = Flask(__name__)
CORS(app)

# Load the sentiment analysis model
svm_model = joblib.load("svm_model.joblib")



# Set up the YouTube API
api_service_name = "youtube"
api_version = 'v3'
Developer_key = "isme api key dal lena .env file mai pada hua hai "

youtube = googleapiclient.discovery.build(
    api_service_name, api_version, developerKey=Developer_key
)

def get_youtube_comments(video_id, max_results=2000):
    request = youtube.commentThreads().list(
        part='snippet',
        videoId=video_id,
        maxResults=max_results
    )
    res = request.execute()

    comments = []
    for item in res.get('items', []):
        comment_text = item['snippet']['topLevelComment']['snippet']['textDisplay']
        comments.append(comment_text)

    return comments

def predict_sentiment(comments):
    predictions = svm_model.predict(comments)
    return predictions.tolist()

@app.route('/get_comments', methods=['POST'])
def get_comments():
    try:
        # Get input data from the request
        data = request.get_json(force=True)
        
        # Assuming 'videoId' is the input YouTube video ID
        video_id = data.get('videoId')

        # Get comments from YouTube API
        comments = get_youtube_comments(video_id)

        # Predict sentiment for each comment
        predictions = predict_sentiment(comments)

        # Combine comments with predictions
        result = [{'comment': comment, 'sentiment': sentiment} for comment, sentiment in zip(comments, predictions)]

        # result = {"comment":123, "abc":123}

        # Return result as JSON
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)

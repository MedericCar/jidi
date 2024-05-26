import logging
import json

from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from mistral import get_questions, get_planning


logging.basicConfig(level=logging.INFO)

app = FastAPI()

# Set up CORS middleware
origins = [
    "http://localhost:3000",  # React front-end URL
    # Add any other origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuestionsRequest(BaseModel):
    text: str
    chat_uuid: str


class PlannerRequest(BaseModel):
    text: str


questions_chats = dict()


import time


@app.post("/questions")
async def questions(query: QuestionsRequest = Body(...)):
    #time.sleep(1)
    #print(query)
    #return JSONResponse({"question": "test", "choices": ["yey"]})
    chat_response = get_questions(query.text, query.chat_uuid)
    server_response = chat_response
    return JSONResponse(json.loads(server_response))

mock_data = """[
    {
        "day": 1,
        "title": "Exploring Paris on Two Wheels",
        "description": "Spend your first day in Paris cycling through its iconic streets and landmarks. Enjoy a picnic lunch in a beautiful park and end your day with a dinner at a local bistro.",
        "activities": [
            {
                "title": "Bike Tour of Paris",
                "timeOfDay": "Morning",
                "description": "Join a guided bike tour to explore the city's famous sites like the Eiffel Tower, Notre Dame, and the Louvre."
            },
            {
                "title": "Picnic in Luxembourg Garden",
                "timeOfDay": "Lunch",
                "description": "Enjoy a picnic lunch in the beautiful Luxembourg Garden, a favorite spot among locals and tourists."
            },
            {
                "title": "Cycling along the Seine",
                "timeOfDay": "Afternoon",
                "description": "Take a leisurely cycle along the Seine River, taking in the stunning views and stopping at interesting spots."
            },
            {
                "title": "Dinner at a Local Bistro",
                "timeOfDay": "Dinner",
                "description": "Savor traditional French cuisine at a local bistro to wrap up your day."
            }
        ]
    },
    {
        "day": 2,
        "title": "Biking through Parisian History and Culture",
        "description": "On your second day, delve into Paris's rich history and culture. Visit historical sites, explore local markets, and enjoy a bike ride through the city's charming neighborhoods.",
        "activities": [
            {
                "title": "Bike to Montmartre",
                "timeOfDay": "Morning",
                "description": "Bike to the historic Montmartre district and visit the famous Sacré-Cœur Basilica."
            },
            {
                "title": "Lunch at a Local Market",
                "timeOfDay": "Lunch",
                "description": "Grab lunch at a local market, like Marché des Enfants Rouges, to taste a variety of French delicacies."
            },
            {
                "title": "Bike Tour of Marais",
                "timeOfDay": "Afternoon",
                "description": "Discover the charming Marais neighborhood, known for its historic architecture, trendy boutiques, and vibrant art scene."
            },
            {
                "title": "Evening at the Eiffel Tower",
                "timeOfDay": "Evening",
                "description": "End your trip with a magical evening at the Eiffel Tower, where you can watch the city lights come alive."
            }
        ]
    }
]"""

@app.post("/planner")
async def planner(query: PlannerRequest = Body(...)):
    #time.sleep(1)
    #print(query)
    #return JSONResponse(json.loads(mock_data))
    chat_response = get_planning(query.text)
    server_response = chat_response
    return JSONResponse(json.loads(server_response))


@app.get("/health")
async def health():
    return {"status": "🤙"}


if __name__ == "__main__":
    uvicorn.run("app:app", host="localhost", port=8000, reload=True)
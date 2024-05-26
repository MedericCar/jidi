import os

from mistralai.client import MistralClient
from mistralai.models.chat_completion import ChatMessage

api_key = os.environ["MISTRAL_API_KEY"]
model = "mistral-large-latest"

client = MistralClient(api_key=api_key)

chats_history = {}


def get_questions(text: str, chat_uid: str) -> str:
    with open("prompts/questions-system-prompt.txt") as file:
        questions_system_prompt = file.read()

    questions_system_message = ChatMessage(role="system", content=questions_system_prompt)

    if chat_uid in chats_history:
        messages = chats_history[chat_uid]
    else:
        messages = [questions_system_message]

    # Add the input message
    messages.append(ChatMessage(role="user", content=text))

    print("DUMPING HISTORY")
    for message in messages:
        print(message.role)
        print(message.content)
    print()

    # Generate a response, add it in the history
    chat_response = client.chat(model=model, messages=messages, response_format={"type": "json_object"})
    assistant_message = chat_response.choices[0].message.content
    messages.append(ChatMessage(role="assistant", content=assistant_message))
    print("OUTPUT:", assistant_message)

    # Save the messages in the history
    chats_history[chat_uid] = messages

    return assistant_message


def get_planning(text: str) -> str:
    with open("prompts/planner-system-prompt-3.txt") as file:
        planner_system_prompt = file.read()

    planner_system_message = ChatMessage(role="system", content=planner_system_prompt)

    # Add the input message
    messages = [planner_system_message, ChatMessage(role="user", content=text)]

    print("DUMPING HISTORY")
    for message in messages:
        print(message.role)
        print(message.content)
    print()

    chat_response = client.chat(model=model, messages=messages, response_format={"type": "json_object"})
    assistant_message = chat_response.choices[0].message.content
    print("OUTPUT:", assistant_message)

    return assistant_message

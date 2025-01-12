from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
import pickle
from typing import List, Union
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

class_names = ['joy', 'fear', 'anger', 'sadness', 'neutral']

class PredictionRequest(BaseModel):
    message: str

class PredictionResponse(BaseModel):
    prediction: str

app = FastAPI(
    title="ML Model API with Tokenizer",
    description="API for text processing and predictions",
    version="1.0.0"
)

origin=['*']
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_cridentials=True, allow_methods=['*'], allow_headers=['*'])

model = None
tokenizer = None
max_length = None 

@app.on_event("startup")
async def load_model_and_tokenizer():
    """Load the model and tokenizer on startup"""
    global model, tokenizer, max_length
    try:
        model = tf.keras.models.load_model('emote-detect.h5')
        print("Model loaded successfully")

        try:
            with open('tokenizer.pickle', 'rb') as handle:
                tokenizer = pickle.load(handle)
            print("Tokenizer loaded successfully")
        except FileNotFoundError:
            tokenizer = Tokenizer()
            print("New tokenizer created")

        max_length = 500 
        
    except Exception as e:
        print(f"Error in startup: {str(e)}")
        raise RuntimeError("Failed to load model or tokenizer")

def preprocess_text(text_data: str) -> np.ndarray:
    """Tokenize and pad the input text"""
    sequences = tokenizer.texts_to_sequences(text_data)
    padded_sequences = pad_sequences(
        sequences,
        maxlen=max_length,
    )
    return padded_sequences

@app.get("/")
async def root():
    return {
        "message": "ML Model API is running",
        "model_status": "loaded" if model is not None else "not loaded",
        "tokenizer_status": "loaded" if tokenizer is not None else "not loaded"
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """Process text and make predictions"""
    if model is None or tokenizer is None:
        raise HTTPException(status_code=500, detail="Model or tokenizer not loaded")
    
    try:
        processed_input = preprocess_text([request.message])
        prediction = model.predict(processed_input)
        final_prediction = class_names[np.argmax(prediction)]
        
        return PredictionResponse(prediction=final_prediction)
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction error: {str(e)}"
        )

@app.get("/tokenizer-info")
async def get_tokenizer_info():
    """Get information about the tokenizer"""
    if tokenizer is None:
        raise HTTPException(status_code=500, detail="Tokenizer not loaded")
    
    return {
        "vocabulary_size": len(tokenizer.word_index) + 1,
        "max_sequence_length": max_length,
        "sample_tokens": dict(list(tokenizer.word_index.items())[:10])
    }

@app.post("/save-tokenizer")
async def save_tokenizer():
    """Save the current tokenizer to a file"""
    if tokenizer is None:
        raise HTTPException(status_code=500, detail="No tokenizer to save")
    
    try:
        with open('tokenizer.pickle', 'wb') as handle:
            pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)
        return {"message": "Tokenizer saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving tokenizer: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
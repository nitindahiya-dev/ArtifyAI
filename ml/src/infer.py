from transformers import CLIPProcessor, CLIPModel
import torch
from PIL import Image
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class ArtAuthenticityModel:
    def __init__(self, ref_image_paths):
        self.model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
        self.processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model.to(self.device)
        ref_images = [Image.open(p) for p in ref_image_paths]
        ref_inputs = self.processor(images=ref_images, return_tensors="pt").to(self.device)
        with torch.no_grad():
            self.ref_embeddings = self.model.get_image_features(**ref_inputs).cpu().numpy()

    def predict(self, image):
        test_input = self.processor(images=image, return_tensors="pt").to(self.device)
        with torch.no_grad():
            test_embedding = self.model.get_image_features(**test_input).cpu().numpy()
        similarities = cosine_similarity(test_embedding, self.ref_embeddings)[0]
        max_sim = np.max(similarities)
        prediction = "authentic" if max_sim > 0.85 else "fake"  # Updated threshold
        return {"prediction": prediction, "confidence": float(max_sim)}

def load_model():
    ref_paths = ['ml/data/processed/authentic_images/authentic_0.jpg', 'ml/data/processed/authentic_images/authentic_4.jpg']
    return ArtAuthenticityModel(ref_paths)
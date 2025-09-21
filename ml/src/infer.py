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
        self.ref_paths = ref_image_paths  # Store paths for similarity reporting
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
        prediction = "authentic" if max_sim > 0.85 else "fake"
        # Get top 2 similar images
        top_indices = np.argsort(similarities)[-2:][::-1]  # Top 2 indices (descending)
        top_similarities = similarities[top_indices].tolist()
        top_images = [self.ref_paths[i] for i in top_indices]
        return {
            "prediction": prediction,
            "confidence": float(max_sim),
            "similar_works": [
                {"path": path, "similarity": sim} for path, sim in zip(top_images, top_similarities)
            ]
        }

def load_model():
    ref_paths = ['ml/data/processed/authentic_images/authentic_0.jpg', 'ml/data/processed/authentic_images/authentic_4.jpg']
    return ArtAuthenticityModel(ref_paths)
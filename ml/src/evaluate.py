import torch
from dataset import get_data_loaders
from model import ArtClassifier
from utils import load_checkpoint

def evaluate():
    _, val_loader = get_data_loaders("../data/processed")

    model = ArtClassifier(num_classes=2)
    load_checkpoint("../models/checkpoint.pt", model)

    model.eval()
    correct, total = 0, 0
    with torch.no_grad():
        for images, labels in val_loader:
            outputs = model(images)
            _, predicted = torch.max(outputs, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

    print(f"Accuracy: {100 * correct / total:.2f}%")

if __name__ == "__main__":
    evaluate()

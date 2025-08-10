import torch
import torch.nn as nn
import torch.optim as optim
from dataset import get_data_loaders
from model import ArtClassifier
from utils import save_checkpoint, ensure_dir

def train_model():
    data_dir = "../data/processed"
    train_loader, val_loader = get_data_loaders(data_dir)

    model = ArtClassifier(num_classes=2)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    epochs = 5
    ensure_dir("../models")

    for epoch in range(epochs):
        model.train()
        total_loss = 0
        for images, labels in train_loader:
            optimizer.zero_grad()
            outputs = model(images)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            total_loss += loss.item()

        print(f"Epoch [{epoch+1}/{epochs}] Loss: {total_loss/len(train_loader):.4f}")

        save_checkpoint(model, optimizer, epoch, f"../models/checkpoint.pt")

if __name__ == "__main__":
    train_model()

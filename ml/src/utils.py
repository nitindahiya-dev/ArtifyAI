import torch
import os

def save_checkpoint(model, optimizer, epoch, path):
    torch.save({
        'epoch': epoch,
        'model_state': model.state_dict(),
        'optimizer_state': optimizer.state_dict()
    }, path)

def load_checkpoint(path, model, optimizer=None):
    checkpoint = torch.load(path, map_location='cpu')
    model.load_state_dict(checkpoint['model_state'])
    if optimizer:
        optimizer.load_state_dict(checkpoint['optimizer_state'])
    return checkpoint['epoch']

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)

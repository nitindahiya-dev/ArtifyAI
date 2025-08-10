# ArtifyAI - Machine Learning Module

This module trains a CNN to classify whether a given artwork is authentic or not.

## Structure
- `data/raw/` - Raw images before preprocessing
- `data/processed/` - Preprocessed training/validation data
- `src/` - Source code for training, evaluating, dataset handling, etc.
- `models/` - Saved model checkpoints
- `experiments/` - Experiment configurations and notebooks

## Running Training
```bash
cd ml/src
python train.py

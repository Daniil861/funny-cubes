import { GameOptions } from '../mc/gameOptions';

// simple function to convert pixels to meters
export function toMeters(n) {
	return n / GameOptions.worldScale;
}

// simple function to convert meters to pixels
export function toPixels(n) {
	return n * GameOptions.worldScale;
}
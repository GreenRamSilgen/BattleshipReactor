import React from 'react';
import { render } from '@testing-library/react';
import {placementPossible} from './testing';

test('renders learn react link', () => {
    expect(placementPossible(75)).toBe(false);
});

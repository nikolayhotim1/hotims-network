import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus component', () => {
    test('Status from props should be in the state', () => {
        const component = create(<ProfileStatus status='Nikolay23' />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('Nikolay23');
    });
    test('After creation "span" should be displayed', () => {
        const component = create(<ProfileStatus status='Nikolay23' />);
        const root = component.root;
        const span = root.findByType('span');
        expect(span).not.toBeNull();
    });
    test('After creation "input" shouldn\'t be displayed', () => {
        const component = create(<ProfileStatus status='Nikolay23' />);
        const root = component.root;
        expect(() => {
            root.findByType('input');
        }).toThrowError();
    });
    test('After creation "span" should contains correct status', () => {
        const component = create(<ProfileStatus status='Nikolay23' />);
        const root = component.root;
        const span = root.findByType('span');
        expect(span.children[0]).toBe('Nikolay23');
    });
    test('"input" should be displayed in edid mode instead of span', () => {
        const component = create(<ProfileStatus status='Nikolay23' />);
        const root = component.root;
        const span = root.findByType('span');
        span.props.onDoubleClick();
        const input = root.findByType('input');
        expect(input.props.value).toBe('Nikolay23');
    });
    test('Callback should be called', () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status='Nikolay23' getUpdateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});
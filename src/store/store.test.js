import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', () => {
    it('should handle creating courses', () => {
        // arrange
        const store = createStore(rootReducer, initialState);
        const course = {
            title: "Clean Code"
        };

        // act
        const action = courseActions.createCourseSuccess(course);
        store.dispatch(action);

        // assert
        const actual = store.getState().courses[0];
        const expected = {
            title: "Clean Code"
        };

        expect(actual).toEqual(expected);
    });

    it('should handle updating courses', () => {
        // arrange
        const store = createStore(rootReducer, initialState);
        const courses = [{
            id: "A",
            title: "Clean Code"
        },
        {
            id: "B",
            title: "React Flux"
        }];

        // act
        const actionCreateA = courseActions.createCourseSuccess(courses[0]);
        const actionCreateB = courseActions.createCourseSuccess(courses[1]);
        store.dispatch(actionCreateA);
        store.dispatch(actionCreateB);

        const updatedCourse = {
            id: "B",
            title: "React Redux"
        };

        const actionUpdate = courseActions.updateCourseSuccess(updatedCourse);
        store.dispatch(actionUpdate);

        // assert
        const actual = store.getState().courses;

        expect(actual.length).toEqual(2);
        expect(actual[0].title).toEqual('Clean Code');
        expect(actual[1].title).toEqual('React Redux');
    });
});

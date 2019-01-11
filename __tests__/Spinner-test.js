import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Spinner from '../components/Spinner';


Enzyme.configure({ adapter: new Adapter() });


function setup() {
    const props = {
        size: 'large',
        color: '#2F3CA3',
    }

    const enzymeWrapper = shallow(<Spinner {...props} />)

    return {
        props,
        enzymeWrapper
    }
}


describe('Spinner snapshot', () => {
    jest.useFakeTimers();

    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = setup()
        expect(enzymeWrapper.prop("style")).toEqual({
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        })
    })

    it('renders the Spinner', async () => {
        const tree = renderer.create(<Spinner />).toJSON();
        expect(tree).toMatchSnapshot();
    });

});


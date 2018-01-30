
export default (node) => {

  return {
    'type': 'closeMainContainer',

    'inputs': [{
      'name': 'width',
    }],

    'outputs': [{
      'name': 'containerWidth'
    }],

    'contextDepends': {
      'state': {
        'modifier': [ 'mainContainer', 'isClosed' ],
        'getter': [ 'isClosed' ]
      },

      'this': {
        'getter': [ 'timer' ]
      }
    }
  }
}

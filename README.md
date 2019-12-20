
### A [React Native](https://facebook.github.io/react-native/docs/getting-started.html) Starter Kit with [React Navigation](https://reactnavigation.org/) + [MobX](https://github.com/mobxjs/mobx) Apps (iOS & Android)

*Brought to you by [GeekyAnts](https://geekyants.com/)*


## Get Started

### 1. System Requirements

* Globally installed [node](https://nodejs.org/en/)

* Globally installed [react-native CLI](https://facebook.github.io/react-native/docs/getting-started.html)


### 2. Installation

On the command prompt run the following commands

```sh
$ git clone https://github.com/GeekyAnts/react-native-boilerplate-mobx-flow.git

$ cd react-native-boilerplate-mobx-flow/

$ npm install
  or
  yarn
```

### Run on iOS

  * Opt #1:
		*	Run `npm start` in your terminal
		*	Scan the QR code in your Expo app
	*	Opt #2:
		*	Run `npm run ios` in your terminal

### Run on Android

  * Opt #1:
		*	Run `npm start` in your terminal
		*	Scan the QR code in your Expo app
	*	Opt #2:
		*	Run `npm run android` in your terminal



###  after npm install  for   deprecated ComponentWillReceiveProps warning Change node_modules/react-navigation-stack/dist/views/Transistioner.js ---> ComponentWillReceiveProps Function
	// eslint-disable-next-line react/no-deprecated
	  componentDidUpdate(prevProps) {
	    let nextScenes = NavigationScenesReducer(this.state.scenes, this.props.navigation.state, prevProps.navigation.state, this.props.descriptors);
	    let _currentprops = this.props;
	    if (!_currentprops.navigation.state.isTransitioning) {
	      nextScenes = filterStale(nextScenes);
	    }

    // Update nextScenes when we change screenProps
    // This is a workaround for https://github.com/react-navigation/react-navigation/issues/4271
    if (_currentprops.screenProps !== prevProps.screenProps) {
      this.setState({ nextScenes });
    }

    if (nextScenes === this.state.scenes) {
      return;
    }

    const indexHasChanged =
      _currentprops.navigation.state.index !== prevProps.navigation.state.index;
    if (this._isTransitionRunning) {
      this._queuedTransition = { _currentprops, nextScenes, indexHasChanged };
    }
    if (_currentprops !== undefined) {
      this._startTransition(_currentprops, nextScenes, indexHasChanged);
    }
  	}

	  _startTransition(nextProps, nextScenes, indexHasChanged) {
	    const nextState = {
	      ...this.state,
	      scenes: nextScenes,
	    };
	    nextProps = this.props;
	    const { position, progress } = nextState; 

    progress.setValue(0);

    this._prevTransitionProps = this._transitionProps;
    this._transitionProps = buildTransitionProps(nextProps, nextState);

    const toValue = nextProps.navigation.state.index;

    if (!this._transitionProps.navigation.state.isTransitioning) {
      this.setState(nextState, async () => {
        const result = nextProps.onTransitionStart(this._transitionProps, this._prevTransitionProps);
        if (result instanceof Promise) {
          await result;
        }
        progress.setValue(1);
        position.setValue(toValue);
        this._onTransitionEnd();
      });
      return;
    }

    // get the transition spec.
    const transitionUserSpec = nextProps.configureTransition ? nextProps.configureTransition(this._transitionProps, this._prevTransitionProps) : null;

    const transitionSpec = {
      ...DefaultTransitionSpec,
      ...transitionUserSpec
    };

    const { timing } = transitionSpec;
    delete transitionSpec.timing;

    const positionHasChanged = position.__getValue() !== toValue;

    // if swiped back, indexHasChanged == true && positionHasChanged == false
    const animations = indexHasChanged && positionHasChanged ? [timing(progress, {
      ...transitionSpec,
      toValue: 1
    }), timing(position, {
      ...transitionSpec,
      toValue: nextProps.navigation.state.index
    })] : [];

    // update scenes and play the transition
    this._isTransitionRunning = true;
    this.setState(nextState, async () => {
      if (nextProps.onTransitionStart) {
        const result = nextProps.onTransitionStart(this._transitionProps, this._prevTransitionProps);

        if (result instanceof Promise) {
          await result;
        }
      }
      Animated.parallel(animations).start(this._onTransitionEnd);
    });
  	}

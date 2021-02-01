import React from "react";
import { ActionMap, ViewModelFactory, Difference, ViewModel } from "./types";
export declare function withViewModel<S, A>(viewModel: ViewModel<S, A>): <T extends S & ActionMap<A>>(WrappedComponent: React.ComponentType<T>) => React.ComponentClass<Difference<T, S & ActionMap<A>>>;
export declare function withViewModel<S, A, P>(viewModel: ViewModelFactory<S, A, P>): <T extends S & ActionMap<A> & P>(WrappedComponent: React.ComponentType<T>) => React.ComponentClass<Difference<T, S & ActionMap<A>> & P>;
export { ObservableMap, SubjectMap, ActionMap, ViewModelFactory, Difference, ViewModel } from "./types";

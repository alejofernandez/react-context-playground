type GenerateLoadingState<K extends { kind: string }> = {
  [S in K as `${S['kind']}Loading`]: boolean;
};

type GenerateSetLoading<K extends { kind: string }> = {
  [S in K as `set${Capitalize<S['kind']>}Loading`]: (loading: boolean) => void;
};

type GenerateErrorState<K extends { kind: string }> = {
  [S in K as `${S['kind']}Error`]?: Error;
};

type GenerateSetError<K extends { kind: string }> = {
  [S in K as `set${Capitalize<S['kind']>}Error`]: (error?: Error) => void;
};

type GenerateStateElement<StateElement, K extends { kind: string }> = {
  [S in K as S['kind']]?: StateElement;
};

type GenerateSetState<StateElement, K extends { kind: string }> = {
  [S in K as `set${Capitalize<S['kind']>}`]: (state?: StateElement) => void;
};

export type LoadableStateElement<T, name extends string> = GenerateStateElement<
  T,
  { kind: name }
> &
  GenerateLoadingState<{ kind: name }> &
  GenerateErrorState<{ kind: name }>;

export type LoadableStateActions<T, name extends string> = GenerateSetState<
  T,
  { kind: name }
> &
  GenerateSetLoading<{ kind: name }> &
  GenerateSetError<{ kind: name }>;

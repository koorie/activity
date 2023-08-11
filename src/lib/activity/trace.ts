import { tracing } from './shared/function.js';

type DataArgument = unknown;
export type TraceOptions = { mute?: boolean }
type params =
  OriginalSignature;

type OriginalSignature = [
  ...data: DataArgument[]
];

export const traceOptions: TraceOptions = { mute: false };

export function trace( ...data: DataArgument[] ): Promise<void|Buffer>;
export async function trace( ...params: params ): Promise<void|Buffer>{

  const concat_data: unknown[] = [];

  for ( const param of params ) {

    concat_data.push( param );
  }
  if( traceOptions.mute === false ){

    process.stdout.write( tracing( concat_data ) );
  }else if( traceOptions.mute === true ){

    return Buffer.from( tracing( concat_data ) );
  }
}

import { error_, number_, object_, string_ } from 'oftypes';
import { tracing, messaging } from './shared/function.js';

type MessageArgument = string | Buffer;
type params =
  OriginalSignature|
  Message|
  MessageError|
  MessageCode|
  MessageErrorCode|
  MessageExitOptions|
  MessageCodeExitOptions|
  MessageErrorExitOptions;
type ExitOptions = {exit?: boolean, mute?: boolean};
type OriginalSignature = [
  message: MessageArgument,
  error?: Error,
  code?: number,
  option?: ExitOptions,
];
type Message = [ message: MessageArgument ];
type MessageError = [ message: MessageArgument, error: Error ];
type MessageCode = [ message: MessageArgument, code: number ];
type MessageErrorCode = [ message: MessageArgument, error: Error, code: number ];
type MessageExitOptions = [ message: MessageArgument, option: ExitOptions ];
type MessageCodeExitOptions = [ message: MessageArgument, code: number, option: ExitOptions ];
type MessageErrorExitOptions = [ message: MessageArgument, error: Error, option: ExitOptions ];

export function exit( message: MessageArgument ): Promise<void>;
export function exit( message: MessageArgument, error: Error ): Promise<void>;
export function exit( message: MessageArgument, code: number ): Promise<void>;
export function exit( message: MessageArgument, error: Error, code: number ): Promise<void>;
export function exit( message: MessageArgument, option: ExitOptions ): Promise<void | Buffer>;
export function exit( message: MessageArgument, code: number, option: ExitOptions ): Promise<void | Buffer>;
export function exit( message: MessageArgument, error: Error, option: ExitOptions ): Promise<void | Buffer>;
export function exit( message: MessageArgument, error?: Error, code?: number, options?: ExitOptions ): Promise<void|Buffer>;

export async function exit( ...params: params ): Promise<void | Buffer>{

  if( params.length === 1
    && await string_( params[ 0 ] ) ){

    const [ message ] = params as Message;
    process.stderr.write( messaging( message ) );
    process.exit( 1 );
  }

  if( params.length === 2
    && await error_( params[ 1 ] )
    && await string_( params[ 0 ] ) ){

    const [ message, error ] = params as MessageError;
    process.stderr.write( messaging( message ) );
    process.stderr.write( tracing( error ) );
    process.exit( 1 );
  }

  if ( params.length === 2
    && await number_( params[ 1 ] )
    && await string_( params[ 0 ] ) ) {

    const [ message, code ] = params as MessageCode;
    process.stderr.write( messaging( message ) );
    process.exit( code );
  }

  if ( params.length === 2
    && await object_( params[ 1 ] )
    && await string_( params[ 0 ] ) ) {

    const [ message, options ] = params as MessageExitOptions;

    if( options.mute === undefined ) {

      options.mute = false;
    }
    if( options.exit === undefined ) {

      options.exit = true;
    }

    if( options.exit ){

      if( !options.mute ){

        process.stderr.write( messaging( message ) );
      }
      process.exit( 1 );
    }else{

      if( !options.mute ){

        process.stderr.write( messaging( message ) );
      }else{

        return Buffer.from( messaging( message ) );
      }
    }
  }

  if ( params.length === 3
    && await number_( params[ 1 ] )
    && await object_( params[ 2 ] )
    && await string_( params[ 0 ] ) ) {

    const [ message, code, options ] = params as MessageCodeExitOptions;

    if( options.mute === undefined ) {

      options.mute = false;
    }
    if( options.exit === undefined ) {

      options.exit = true;
    }

    if( options.exit ){

      if( !options.mute ){

        process.stderr.write( messaging( message ) );
      }
      process.exit( code );
    }else{

      if( !options.mute ){

        process.stderr.write( messaging( message ) );
      }else{

        return Buffer.from( messaging( message ) );
      }
    }
  }

  if ( params.length === 3
    && await error_( params[ 1 ] )
    && await object_( params[ 2 ] )
    && await string_( params[ 0 ] ) ) {

    const [ message, error, options ] = params as MessageErrorExitOptions;

    if( options.mute === undefined ) {

      options.mute = false;
    }
    if( options.exit === undefined ) {

      options.exit = true;
    }

    if( options.exit ){

      if( !options.mute ){

        process.stderr.write( messaging( message ) );
        process.stderr.write( tracing( error ) );
      }
      process.exit( 0 );
    }else{

      if( !options.mute ){

        process.stderr.write( messaging( message ) );
        process.stderr.write( tracing( error ) );
      }else{

        const msg = messaging( message ) + tracing( error );

        return Buffer.from( msg );
      }
    }
  }

  if ( params.length === 3
    && await error_( params[ 1 ] )
    && await number_( params[ 2 ] ) ) {

    const [ message, error, code ] = params as MessageErrorCode;
    process.stderr.write( messaging( message ) );
    process.stderr.write( tracing( error ) );
    process.exit( code );
  }

  if ( params.length === 4 ) {

    const [ message, error, code, options ] = params as OriginalSignature;

    if( options.mute === undefined ) {

      options.mute = false;
    }
    if( options.exit === undefined ) {

      options.exit = true;
    }

    if( options.exit ){

      if( !options.mute ){

        process.stderr.write( messaging( message ) );
        process.stderr.write( tracing( error ) );
      }
      process.exit( code );
    }else{

      if( !options.mute ){

        process.stderr.write( messaging( message ) );
        process.stderr.write( tracing( error ) );
      }else{

        const msg = messaging( message ) + tracing( error );

        return Buffer.from( msg );
      }
    }
  }
}

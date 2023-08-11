import { boolean_, string_ } from 'oftypes';
import { messaging } from './shared/function.js';

type MessageArgument = string | Buffer;

type params =
  OriginalSignature|
  Message|
  MessageMute;

type OriginalSignature = [
  mute?: boolean,
  ...message: MessageArgument[]
];

type Message = [ ...message: MessageArgument[] ];
type MessageMute = [ mute?: boolean, ...message: MessageArgument[] ];

export function stdout( ...message: MessageArgument[] ): Promise<void>;
export function stdout( mute: boolean, ...message: MessageArgument[] ): Promise<void|Buffer>;

export async function stdout( ...params: params ): Promise<void|Buffer> {

  if( params.length === 1
    && await string_( params[ 0 ] ) ){

    const [ message ] = params as Message;
    process.stdout.write( messaging( message ) );

    return;
  }

  if( params.length === 2
    && await string_( params[ 1 ] )
    && await boolean_( params[ 0 ] ) ){

    const [ mute, message ] = params as MessageMute;
    if( mute === false ){

      process.stdout.write( messaging( message ) );
    }else if( mute === true ){

      return Buffer.from( messaging( message ) );
    }
  }

  if( params.length >= 2 ){

    let message_concat = '';
    let mute = false;

    for ( const param of params ) {

      if( await string_( param ) ){

        message_concat += param as MessageArgument;
      }else if( await boolean_( param ) ){

        if( param === true ){

          mute = true;
        }
      }
    }
    if( mute === false ){

      process.stdout.write( messaging( message_concat ) );
    } else {

      return Buffer.from( messaging( message_concat ) );
    }
  }
}

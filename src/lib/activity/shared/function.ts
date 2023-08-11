import { inspect } from 'node:util';

type MessageArgument = string | Buffer;
export function messaging ( message: MessageArgument ): string {

  return message.toString();
}

export function tracing ( data: Error | unknown ): string {

  return `    
{♠ trace} ${ inspect( data, {
    showHidden: true,
    depth: Infinity,
    colors: true,
  } ) }
`;
}

import { BellIcon, LogOutIcon, Sparkles, UserIcon } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

import { signOutAction } from '@/app/actions';

import { createClient } from '@/utils/supabase/server';

export default async function HeaderAuth() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={user.user_metadata?.avatar_url ?? ''}
              alt={user.user_metadata?.name ?? ''}
            />
            <AvatarFallback>
              <UserIcon size={16} />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='end'
        forceMount>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-1 leading-none'>
            <p className='font-medium'>{user.user_metadata?.name}</p>
            <p className='text-sm text-muted-foreground'>{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link
            href='/'
            className='flex items-center w-full cursor-pointer'>
            <Sparkles
              size={16}
              className='mr-2'
            />
            <span>Upgrade to Pro</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href='/dashboard'
            className='flex items-center w-full cursor-pointer'>
            <BellIcon
              size={16}
              className='mr-2'
            />
            <span>Notification</span>
          </Link>
        </DropdownMenuItem>
        <form action={signOutAction}>
          <button
            type='submit'
            className='relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none hover:text-accent-foreground hover:bg-accent data-disabled:opacity-50 w-full'>
            <LogOutIcon
              size={16}
              className='mr-2'
            />
            <span>Sign out</span>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className='flex gap-2'>
      <Button
        asChild
        size='sm'
        variant='ghost'>
        <Link href='/sign-in'>Sign in</Link>
      </Button>
      <Button
        asChild
        size='sm'
        variant='secondary'>
        <Link href='/sign-up'>Sign up</Link>
      </Button>
    </div>
  );
}

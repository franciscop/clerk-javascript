import { OrganizationProfileProps } from '@clerk/types/src';
import React from 'react';

import { withCoreUserGuard } from '../../contexts';
import { Flow } from '../../customizables';
import { ProfileCard, withCardStateProvider } from '../../elements';
import { Route, Switch } from '../../router';
import { OrganizationProfileNavbar } from './OrganizationProfileNavbar';
import { OrganizationProfileRoutes } from './OrganizationProfileRoutes';

const _OrganizationProfile = (_: OrganizationProfileProps) => {
  return (
    <Flow.Root flow='organizationProfile'>
      <Flow.Part>
        <Switch>
          {/* PublicRoutes */}
          <Route path='verify'>{/*<VerificationSuccessPage />*/}</Route>
          <Route>
            <AuthenticatedRoutes />
          </Route>
        </Switch>
      </Flow.Part>
    </Flow.Root>
  );
};

const AuthenticatedRoutes = withCoreUserGuard(() => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  return (
    <ProfileCard sx={{ height: '100%' }}>
      <OrganizationProfileNavbar contentRef={contentRef}>
        <OrganizationProfileRoutes contentRef={contentRef} />
      </OrganizationProfileNavbar>
    </ProfileCard>
  );
});

export const OrganizationProfile = withCardStateProvider(_OrganizationProfile);

// @ts-ignore
export const OrganizationProfileModal = (props: OrganizationProfileProps): JSX.Element => {
  // const userProfileProps: OrganizationProfileCtx = {
  //   ...props,
  //   routing: 'virtual',
  //   componentName: 'OrganizationProfile',
  //   mode: 'modal',
  // };

  return (
    <Route path='user'>
      {/*<ComponentContext.Provider value={userProfileProps}>*/}
      {/*TODO: Used by InvisibleRootBox, can we simplify? */}
      <div>
        {/*<OrganizationProfile {...userProfileProps} />*/}
        <OrganizationProfile />
      </div>
      {/*</ComponentContext.Provider>*/}
    </Route>
  );
};

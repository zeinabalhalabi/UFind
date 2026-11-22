import { NativeTabs } from 'expo-router/native-tabs';
{/* code from expo router documentation for native tabs */}
export default function TabLayout() {
  return (
    <NativeTabs tintColor="#AF125A">
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          md={{ default: 'home', selected: 'home_filled' }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="browse">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'safari', selected: 'safari.fill' }}
          md={{ default: 'explore', selected: 'explore' }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="report">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'plus.circle', selected: 'plus.circle.fill' }}
          md={{ default: 'add_circle_outline', selected: 'add_circle' }}
        />
      </NativeTabs.Trigger>

        <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon
          sf={{ default: 'person', selected: 'person.fill' }}
          md={{ default: 'person_outline', selected: 'person' }}
        />
      </NativeTabs.Trigger>

    </NativeTabs>
  );
}

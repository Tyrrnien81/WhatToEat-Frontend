/**
 * Re-export the tab “Home” implementation so anything importing `screens/HomeScreen`
 * resolves to the same UI as `BottomBar` (not the old placeholder).
 */
export { default } from './HomeScreen/HomeScreenMain';

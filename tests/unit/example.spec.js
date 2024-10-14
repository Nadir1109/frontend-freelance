import { shallowMount } from '@vue/test-utils';
import UsersView from '@/components/UsersView.vue'; // Zorg ervoor dat het pad correct is

describe('UsersView.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(UsersView, {
      data() {
        return {
          users: [
            { id: 1, username: 'UserOne', email: 'userone@example.com' },
            { id: 2, username: 'UserTwo', email: 'usertwo@example.com' }
          ],
        };
      }
    });
  });

  it('renders a list of users', () => {
    const rows = wrapper.findAll('tbody tr');
    expect(rows.length).toBe(2); // Controleer of er twee gebruikers worden weergegeven
  });

  it('displays correct user data', () => {
    const firstRow = wrapper.find('tbody tr');
    expect(firstRow.text()).toContain('UserOne');
    expect(firstRow.text()).toContain('userone@example.com');
  });

  it('shows input fields when editing a user', async () => {
    const editButton = wrapper.findAll('.edit-btn').at(0);
    await editButton.trigger('click'); // Simuleer een klik op de bewerkknop

    const inputFields = wrapper.findAll('input');
    expect(inputFields.length).toBe(2); // Controleer of er twee invoervelden worden weergegeven
    expect(inputFields.at(0).element.value).toBe('UserOne'); // Controleer de waarde van het username veld
    expect(inputFields.at(1).element.value).toBe('userone@example.com'); // Controleer de waarde van het email veld
  });

  it('saves edited user data', async () => {
    // Simuleer het bewerken van de gebruiker
    const editButton = wrapper.findAll('.edit-btn').at(0);
    await editButton.trigger('click');

    // Simuleer het wijzigen van de invoerwaarden
    const usernameInput = wrapper.find('input').setValue('NewUsername');
    const saveButton = wrapper.find('.save-btn');
    await saveButton.trigger('click');

    // Controleer of de nieuwe waarde is opgeslagen
    const firstRow = wrapper.find('tbody tr');
    expect(firstRow.text()).toContain('NewUsername');
  });
});

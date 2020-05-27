const e = React.createElement;

class StatusBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '100%',
      height: '100%',
    }
  }

  componentDidMount() {
    if (this.props.listen) {
      window.addEventListener('message', function(event) {
        const health = event.data.health;
        const maxHealth = event.data.maxHealth;
        const percent = Math.round(health / maxHealth * 100);
        this.setState({ width: `${percent}%` });
      }.bind(this));
    }
  }

  render() {
    return e(
      'div',
      { className: `status-box status-box-${this.props.type}` },
      [
        e('div', {
            className: `status-box-inner`,
            style: {
              backgroundColor: this.props.color,
              height: this.state.height,
              width: this.state.width,
            },
          },
          [e('span', { className: 'material-icons' }, this.props.icon)],
        )
      ]
    );
  }
}

class App extends React.Component {
  render() {
    return e(
      'div',
      { 'className': 'np-health-armor' },
      [
        e(StatusBox, { type: 'primary', color: 'green', icon: 'favorite', listen: true }),
        e(StatusBox, { type: 'primary', color: 'blue', icon: 'shield' }),
        e(StatusBox, { type: 'secondary', color: 'orange', icon: 'fastfood' }),
        e(StatusBox, { type: 'secondary', color: 'lightblue', icon: 'local_bar' }),
        e(StatusBox, { type: 'secondary', color: '#ccc', icon: 'ac_unit' }),
        e(StatusBox, { type: 'secondary', color: 'red', icon: 'person_outline' }),
      ],
    );
  }
}

ReactDOM.render(e(App), document.getElementById('np-ui'));